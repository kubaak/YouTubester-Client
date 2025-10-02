// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  replies: {
    input: { target: "http://localhost:5094/swagger/v1/swagger.json" }, // adjust port if needed
    output: {
      target: "src/api/replies.ts",        // generated hooks
      schemas: "src/api/replies.types.ts", // generated DTOs
      client: "react-query",
      httpClient: "axios",
      clean: true,
      prettier: true,
    },
  },
});
