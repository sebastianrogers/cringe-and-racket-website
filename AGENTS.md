# Agent instructions

Before pushing a pull request, run the repository's available unit tests and fix any failures caused by your changes. Rerun the tests after fixes and confirm they pass.

This repository is an Eleventy-built static site (source in `src/`, output in `_site/`) with no configured test runner. For changes to pages or styles, run `npm run build` and perform these basic checks against `_site/`:

- Verify local links and asset references point to files that exist.
- Check that the modified HTML remains well-formed.

Do not add test dependencies solely to perform these checks. In the pull request summary, state which tests or checks you ran.
