import { Mock } from "vitest";
import { App } from "./App";
import { Repo } from "./Repo";
import { handler } from "./handler/Handler";

vi.mock("./handler/Handler");
vi.mock("./Repo");

describe("mock tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("mocks handler within App", () => {
    (handler as Mock).mockImplementation(() => "mocked");
    const spy = vi.spyOn(console, "log");

    new App("original");
    expect(spy).toHaveBeenCalledWith("Handler: mocked");
    expect(spy).toHaveBeenCalledWith("Repo: undefined");
  });

  it("mocks class within App", () => {
    const spy = vi.spyOn(console, "log");
    const mockedRepo = vi.mocked(Repo) as Mock;
    mockedRepo.mockImplementation(() => {
      return {
        getToken: () => "mocked",
      };
    });

    new App("original");
    expect(spy).toHaveBeenCalledWith("Handler: undefined");
    expect(spy).toHaveBeenCalledWith("Repo: mocked");
  });

  it("spy on Repo class constructor within App", async () => {
    const repoImport = await import("./Repo");
    const spy = vi.spyOn(console, "log");
    const spyRepo = vi.spyOn(repoImport, "Repo") as Mock;

    spyRepo.mockImplementation(() => {
      return {
        getToken: () => "spy",
      };
    });

    new App("original");
    expect(spy).toHaveBeenCalledWith("Handler: undefined");
    expect(spy).toHaveBeenCalledWith("Repo: spy");
    expect(spyRepo).toBeCalledTimes(1);
    expect(spyRepo).toHaveBeenCalledWith("original");
  });
});
