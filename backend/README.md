```shell
rails db:migrate
rails db:seed
rails server
curl 'localhost:3000/notes?page=1&page_size=5&order=user_id&descending=true' |  python -m json.tool
```
