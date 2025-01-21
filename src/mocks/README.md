# API mocks for the take-home assigment

**⚠️⚠️ NOTE ⚠️⚠️**: You should't need to change anything in this folder!

The API mocks are handled by [MSWJS](shttps://mswjs.io/) and you can call them
directly in your browser (eg: src/api/moonPhase.tsx:5).

## API details

### MoonPhase API

<details>
 <summary><code>GET</code> <code><b>/api/moonphase</b></code> <code>(Get current moon phase data)</code></summary>

##### Responses

> | http code | content-type       | response                      |
> | --------- | ------------------ | ----------------------------- |
> | `200`     | `application/json` | `JSON Object <MoonPhaseData>` |

##### Response detail

```json
{
  "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
  "illumination": "<float between 0 and 100>"
}
```

</details>

### Observation API

<details>
 <summary><code>GET</code> <code><b>/api/observations</b></code> <code>(List available observations)</code></summary>

##### Parameters

> | name | type     | data type | description                  |
> | ---- | -------- | --------- | ---------------------------- |
> | skip | optional | number    | Page index                   |
> | take | optional | number    | Number of elements in a page |

##### Responses

> | http code | content-type       | response                         |
> | --------- | ------------------ | -------------------------------- |
> | `200`     | `application/json` | `JSON Object <ObservationsData>` |

##### Response detail

```json
{
    "observations": [
        {
        "id": "<UUID>",
        "date": "<ISO 8601 date of the observation>",
        "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
        "illumination": "<float between 0 and 100>"
        },
        ...
    ],
    "total": "total number of observation in DB"
}
```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/observations/:id</b></code> <code>(Get a single observation by ID)</code></summary>

##### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `JSON Object <Observation>`         |
> | `404`     | `application/json` | `{ error: "No observation found" }` |

##### Response detail

```json
{
    "id": "<UUID>",
    "date": "<ISO 8601 date of the observation>",
    "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
    "illumination": "<float between 0 and 100>"
},

```

</details>

<details>
 <summary><code>POST</code> <code><b>/api/observations</b></code> <code>(Create an observation)</code></summary>

##### Responses

> | http code | content-type       | response                                |
> | --------- | ------------------ | --------------------------------------- |
> | `201`     | `application/json` | `JSON Object <Observation>`             |
> | `400`     | `application/json` | `{ error: "Invalid observation data" }` |

##### Request body

```json
{
    "date": "<ISO 8601 date of the observation>",
    "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
    "illumination": "<float between 0 and 100>"
},

```

All fields are optionals.

##### Response detail

```json
{
    "id": "<UUID>",
    "date": "<ISO 8601 date of the observation>",
    "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
    "illumination": "<float between 0 and 100>"
},

```

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/observations/:id</b></code> <code>(Edit an observation)</code></summary>

##### Responses

> | http code | content-type       | response                                |
> | --------- | ------------------ | --------------------------------------- |
> | `200`     | `application/json` | `JSON Object <Observation>`             |
> | `400`     | `application/json` | `{ error: "Invalid observation data" }` |
> | `404`     | `application/json` | `{ error: "No observation found" }`     |

##### Request body

```json
{
    "date": "<ISO 8601 date of the observation>",
    "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
    "illumination": "<float between 0 and 100>"
},

```

All fields are optionals.

##### Response detail

```json
{
    "id": "<UUID>",
    "date": "<ISO 8601 date of the observation>",
    "phase": "New Moon | Waxing crescent | First quarter | Waxing gibbous | Full Moon | Waning gibbous | Last quarter | Waning crescent",
    "illumination": "<float between 0 and 100>"
},

```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/observations/:id</b></code> <code>(Delete an observation)</code></summary>

##### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `204`     | null               | null                                |
> | `404`     | `application/json` | `{ error: "No observation found" }` |

</details>
