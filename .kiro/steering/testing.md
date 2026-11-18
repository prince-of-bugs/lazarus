---
inclusion: always
---

# Testing

- Every module with logic gets Hypothesis property tests, marked `@pytest.mark.property`.
- Required properties on Lazarus itself:
  - P1 normalizer idempotence
  - P2 comparator reflexive and symmetric
  - P3 non-collapse of `1`, `'1'`, `True`, `1.0`
  - P4 cross-interpreter round-trip of tagged values
  - P5 metamorphic: original vs itself yields 0 divergences
  - P6 sandbox determinism for a fixed seed
  - P7 shrinker preserves the divergence
  - P8 held-out independence: graded inputs and repair inputs are disjoint
- "Equivalent" requires at least 200 meaningful (not `assume`-rejected) examples per function.
- Frontend: type-check and lint must pass before commit.
