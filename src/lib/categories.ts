// ---------------------------------------------------------------------------
// Filter categories for /work.
//
// Individual projects keep their SPECIFIC tags ("KiCad", "ANSYS Fluent",
// "Marquetry") — those are what you want to read on a project page. But there
// are 45+ of them across the catalogue, which makes a useless filter bar. So
// the filter groups them into disciplines instead.
//
// A tag may belong to more than one discipline: an FEA study is both Mechanical
// and CAD & Simulation, and a brushless motor is both Mechanical and
// Electrical. The filter is an OR, so overlap is a feature, not a problem.
//
// Adding a new tag to a project? Add it here too. `categoriesFor()` throws at
// build time on an unmapped tag, so a new tag can't silently disappear from the
// filter — you will get a clear error instead of a project that quietly stops
// matching anything.
// ---------------------------------------------------------------------------

/** Display order of the filter buttons. */
export const CATEGORIES = [
  'Mechanical',
  'Electrical',
  'Software',
  'CAD & Simulation',
  'Fabrication',
  'Woodworking',
  'Design',
  'Hackathon',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Specific tag → the disciplines it counts towards. */
const TAG_CATEGORIES: Record<string, Category[]> = {
  // — mechanical engineering —
  'Mechanical Design': ['Mechanical'],
  'Structural Design': ['Mechanical'],
  Composites: ['Mechanical', 'Fabrication'],
  FEA: ['Mechanical', 'CAD & Simulation'],
  'ANSYS Fluent': ['Mechanical', 'CAD & Simulation'],
  'Technical Drawing': ['Mechanical', 'CAD & Simulation'],
  'Brushless Motor': ['Mechanical', 'Electrical'],

  // — electronics —
  'PCB Design': ['Electrical'],
  KiCad: ['Electrical', 'CAD & Simulation'],
  Arduino: ['Electrical', 'Software'],
  Hardware: ['Mechanical', 'Electrical'],
  LiDAR: ['Electrical'],
  'Bluetooth LE': ['Electrical', 'Software'],

  // — CAD —
  CAD: ['CAD & Simulation'],
  'Fusion 360': ['CAD & Simulation'],
  SolidWorks: ['CAD & Simulation'],
  Rhino3D: ['CAD & Simulation', 'Design'],

  // — making things —
  Fabrication: ['Fabrication'],
  Manufacturing: ['Fabrication'],
  'Machine Shop': ['Fabrication'],
  'Rapid Prototyping': ['Fabrication'],
  'Laser Cutting': ['Fabrication'],
  '3D Printing': ['Fabrication'],

  // — wood —
  Woodworking: ['Woodworking'],
  Marquetry: ['Woodworking', 'Design'],
  Veneer: ['Woodworking'],
  Pyrography: ['Woodworking', 'Design'],

  // — design —
  Design: ['Design'],
  'Game Design': ['Design'],
  Architecture: ['Design'],
  'Adobe Illustrator': ['Design'],
  UX: ['Design', 'Software'],
  Generative: ['Design', 'Software'],

  // — software —
  TypeScript: ['Software'],
  Python: ['Software'],
  Rust: ['Software'],
  React: ['Software'],
  'Next.js': ['Software'],
  'Node.js': ['Software'],
  'Three.js': ['Software'],
  FastAPI: ['Software'],
  Swift: ['Software'],
  Convex: ['Software'],
  SQLite: ['Software'],
  WASM: ['Software'],
  WebGL: ['Software'],
  Shaders: ['Software'],
  Audio: ['Software'],
  'AI/LLM': ['Software'],
  MCP: ['Software'],
  'Knowledge Graph': ['Software'],

  // — deliberately not a discipline —
  // Programme/context labels: useful on the project page, meaningless as a
  // filter. Mapped to [] so they are known-and-ignored rather than an error.
  MITES: [],
  Hackathon: ['Hackathon'],
};

/**
 * Map a project's specific tags to its filter categories, de-duplicated and in
 * CATEGORIES order. Throws on an unmapped tag so the omission is loud.
 */
export function categoriesFor(tags: string[]): Category[] {
  const found = new Set<Category>();
  for (const tag of tags) {
    const cats = TAG_CATEGORIES[tag];
    if (!cats) {
      throw new Error(
        `Unmapped project tag: "${tag}". Add it to TAG_CATEGORIES in ` +
          `src/lib/categories.ts (use [] if it is a programme label rather ` +
          `than a discipline).`,
      );
    }
    for (const c of cats) found.add(c);
  }
  return CATEGORIES.filter((c) => found.has(c));
}
