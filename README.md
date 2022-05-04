# react-rails

This repository should be an example of our latest best (laziest) practices.
When a feature team is contributing a new page to Admin Portal V2, point them
here so they avoid all the mistakes we made writing when writing V1.

It's for for this to just be links as its pointless to maintain our own poor paraphrasing of high-quality crowd-sourced documentation.

See READMEs in backend/frontend for run/install instructions.

Laziness Philosophy:
* Backend
  * DataGrid for sorting filtering
  * Kaminari for pagination.
* Frontend
  * React Query for state management of API results
  * Yup for richer schemas than Typescript with field validations
  * React Hook Form w/ Yup validator to remove Controlled Form boilerplate

Features:
* Table (Mui DataGrid)
  * Sort by ID, User ID, Category
  * Filter by User ID, Category
  * Server-side sort, filter, pagination.
* Form
  * React Hook Form, so no manual onChange to parse, validate, show errors
  * Yup schemas
    * InferType, so no manually written TS interfaces
    * User ID column parsed as number, enforces min/max
    * Note if present has regex validation

References:
* https://tkdodo.eu/blog/practical-react-query
* https://mui.com/x/react-data-grid/