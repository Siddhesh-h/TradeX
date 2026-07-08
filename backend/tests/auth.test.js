import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../app.js";

describe("Authentication protection", () => {
    it("should reject access to /api/auth/me without authentication", async () => {
        const response = await request(app).get("/api/auth/me");

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            message: "Not authenticated",
        });
    });

    it("should reject an invalid authentication token", async () => {
        const response = await request(app)
            .get("/api/auth/me")
            .set("Cookie", ["token=invalid-token"]);

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            message: "Invalid or expired token",
        });
    });
});
