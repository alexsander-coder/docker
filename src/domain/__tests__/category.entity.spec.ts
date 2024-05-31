import { Category } from "../category.entity"

describe('category unit tests', () => {
  describe('constructor', () => {
    test('constructor create category with default values', () => {
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
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    })
  })
})