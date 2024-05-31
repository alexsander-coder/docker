import { Category } from "../category.entity"

describe('category unit tests', () => {
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        name: 'movie'
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("shold create a category with all values", () => {
      const created_at = new Date()
      const category = new Category({
        name: 'movie',
        description: 'description movie',
        is_active: true,
        created_at
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBe('description movie');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBe(created_at);

    })

    test("should create a category with name and description", () => {
      const category = new Category({
        name: "movie",
        description: "movie description"
      })
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBe('movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })
  })

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "movie"
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("sohuld a category with description", () => {
      const category = Category.create({
        name: 'movie',
        description: "some description"
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })

    test("constructor all 3", () => {
      const created_at = new Date()
      const category = new Category({
        name: 'movie',
        description: 'description movie',
        is_active: false,
        created_at
      })
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('movie');
      expect(category.description).toBe('description movie');
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBe(created_at);
    })
  })
})