import { registerUser, loginUser } from "../../src/services/auth.services";
import { User } from "../../src/models/User";
import * as hashUtils from "../../src/utils/hash.util";
import * as jwtUtils from "../../src/utils/jwt.util";

jest.mock("../../src/models/User");

describe("Auth Service", () => {
  const mockUser = {
    _id: "68b13c884add4f05ab576bf6",
    name: "Ahmed",
    email: "ahmed@test.com",
    password: "hashed",
    role: "student",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register new user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    jest.spyOn(hashUtils, "hashPassword").mockResolvedValue("hashed");
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await registerUser({
      name: "Ahmed",
      email: "ahmed@test.com",
      password: "12345678",
      role: "student",
    });
    expect(result).toEqual(mockUser);
  });

  it("should not register if email exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    await expect(
      registerUser({
        name: "Ahmed",
        email: "ahmed@test.com",
        password: "12345678",
        role: "student",
      })
    ).rejects.toThrow("Email already exists");
  });

  it("should login user with valid credentials", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    jest.spyOn(hashUtils, "comparePassword").mockResolvedValue(true);
    jest.spyOn(jwtUtils, "generateToken").mockReturnValue("mockToken");

    const token = await loginUser({
      email: "ahmed@test.com",
      password: "12345678",
    });
    expect(token).toBe("mockToken");
  });

  it("should reject login with invalid email", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      loginUser({ email: "wrong@test.com", password: "12345678" })
    ).rejects.toThrow("Invalid email or password!");
  });

  it("should reject login with wrong password", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    jest.spyOn(hashUtils, "comparePassword").mockResolvedValue(false);

    await expect(
      loginUser({ email: "john@test.com", password: "wrong" })
    ).rejects.toThrow("Invalid email or password");
  });
});
