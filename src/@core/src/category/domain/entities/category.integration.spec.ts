import { Category } from "./category";

describe("Category Integration tests", () => {
  describe("create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => {
        new Category({
          name: null,
        });
      }).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => {
        new Category({
          name: "",
        });
      }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => {
        new Category({
          name: 5 as any,
        });
      }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () =>
          new Category({
            name: "t".repeat(256),
          })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using description property", () => {
      expect(() => {
        new Category({
          name: "Movie",
          description: 5 as any,
        });
      }).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(() => {
        new Category({
          name: "Movie",
          is_active: "" as any,
        });
      }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("should a valid category", () => {
      expect.assertions(0);
      new Category({ name: "Movie" });
      new Category({ name: "Movie", description: "some description" });
      new Category({ name: "Movie", description: null });
      new Category({
        name: "Movie",
        description: "some description",
        is_active: false,
      });
      new Category({
        name: "Movie",
        description: "some description",
        is_active: true,
      });
    });
  });
  describe("update method", () => {
    it("should a invalid category using name property", () => {
      const category = new Category({ name: "Movie" });
      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.update("", null)).containsErrorMessages({
        name: ["name should not be empty"],
      });
      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() =>
        category.update("t".repeat(256), null)
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });
    it("should a invalid category using description property", () => {
      const category = new Category({ name: "Movie" });
      expect(() => category.update("Movie", 5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a valid category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Movie" });
      category.update("name changed", null);
      category.update("name changed", "some description");
    });
  });
});
