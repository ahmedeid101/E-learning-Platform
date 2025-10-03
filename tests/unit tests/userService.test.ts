import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  deleteAnyUser,
} from "../../src/services/user.services";
import { User } from "../../src/models/User";
jest.mock("../../src/models/User");

describe("User Service", () => {
  const mockUser = {
    _id: "68b13c884add4f05ab576bf6",
    name: "ahmed",
    email: "ahmed@test.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user profile without password", async () => {
    (User.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await getUserProfile("68b13c884add4f05ab576bf6");
    expect(result).toEqual(mockUser);
  });

  it("should update user profile", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ ...mockUser, name: "Updated" }),
    });

    const result = await updateUserProfile("68b13c884add4f05ab576bf6", {
      name: "Updated",
    });
    expect(result?.name).toBe("Updated");
  });

  it("should delete user profile", async () => {
    (User.findOneAndDelete as jest.Mock).mockResolvedValue(mockUser);

    const result = await deleteUserProfile("68b13c884add4f05ab576bf6");
    expect(result).toEqual(mockUser);
  });

  it("should get all users without passwords", async () => {
    (User.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue([mockUser]),
    });

    const result = await getAllUsers();
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe("ahmed@test.com");
  });

  it("should delete any user", async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

    const result = await deleteAnyUser("68b13c884add4f05ab576bf6");
    expect(result).toEqual(mockUser);
  });
});
