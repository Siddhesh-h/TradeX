import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../app.js";

describe("Health API", () => {
    it("should return API health status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            success: true,
            message: "TradeX API is running",
        });
    });

    it("should return 404 for an unknown route", async () => {
        const response = await request(app).get("/api/unknown-route");

        expect(response.status).toBe(404);
    });
});
