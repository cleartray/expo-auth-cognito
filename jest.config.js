export const preset = 'jest-expo'
export const collectCoverage = true
export const coverageReporters = ['text', 'html']
export const collectCoverageFrom = [
  'src/**/*.ts'
]
export const coverageThreshold = {
  global: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100
  }
}
