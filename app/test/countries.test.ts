
import {
  jest,
  beforeEach,
  test,
  expect,
} from "@jest/globals";
import { GET } from "@/app/(pages)/api/route";
import axios from "axios";

jest.mock("axios");
const ax = jest.mocked(axios);   

beforeEach(() => {
  process.env.RESTCOUNTRIES_BASE_URL = "https://restcountries.com/v3.1";
  ax.get.mockReset();
});

test("GET → 200 con lista de países", async () => {
  const data = [{ name: { common: "Estonia" } }];
  ax.get.mockResolvedValue({ data });

  const res = await GET();

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual(data);
});

test("GET → 404 con mensaje de error", async () => {
  ax.get.mockRejectedValue({
    response: { status: 404, data: "Not found" },
  });

  const res = await GET();

  expect(res.status).toBe(404);
  expect(await res.json()).toEqual({ error: "Not found" });
});
