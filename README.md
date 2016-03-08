### Klassify

Redis based text classification service with real-time web interface.

### What is Text Classification

Text classification, document classification or document categorization is a problem in library science, information science and computer science. The task is to assign a document to one or more classes or categories.

<https://en.wikipedia.org/wiki/Document_classification>

### Demo

![klassify](http://i.imgur.com/iG4atNg.gif)

### Installing

    pip install klassify

#### Usage

```
python -m klassify
```

Command line options:

```
  --port                           run on the given port (default 8888)
  --prefix                         prefix that will be used in redis keys
                                   (default klassify)
  --redis-db                       redis database (default 0)
  --redis-host                     redis host (default localhost)
  --redis-port                     redis port (default 6379)
```

