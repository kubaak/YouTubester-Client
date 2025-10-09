// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  replies: {
    input: { target: "http://localhost:5094/swagger/v1/swagger.json" },
    output: {
      target: "src/api/replies.ts",
      schemas: "src/api",  
      client: "react-query",
      httpClient: "axios",
      clean: true,
      prettier: true,
    },
  },
});
