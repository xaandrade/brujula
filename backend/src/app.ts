import cors from "cors";
import express, { type ErrorRequestHandler } from "express";

import { analyzeProfile } from "./profileAnalyzer.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/profiles/analyze", (request, response) => {
  const body: unknown = request.body;

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    response.status(400).json({
      error: {
        code: "INVALID_REQUEST",
        message: "El cuerpo debe ser un objeto JSON con el campo handle.",
      },
    });
    return;
  }

  const rawHandle = (body as Record<string, unknown>).handle;
  if (typeof rawHandle !== "string") {
    response.status(400).json({
      error: {
        code: "INVALID_HANDLE",
        message: "El campo handle debe ser texto.",
      },
    });
    return;
  }

  const handle = rawHandle.trim().replace(/^@/, "");
  if (handle.length < 2 || handle.length > 24 || !/^[A-Za-z0-9._]+$/.test(handle)) {
    response.status(400).json({
      error: {
        code: "INVALID_HANDLE",
        message:
          "El usuario debe tener entre 2 y 24 caracteres y solo puede incluir letras, números, puntos y guiones bajos.",
      },
    });
    return;
  }

  response.json(analyzeProfile(handle));
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "No se encontró el endpoint solicitado.",
    },
  });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "El cuerpo de la solicitud no contiene JSON válido.",
      },
    });
    return;
  }

  console.error("Error inesperado en la API:", error);
  response.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Ocurrió un error interno.",
    },
  });
};

app.use(errorHandler);
