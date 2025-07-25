# Segment
Connector that pulls from Segment&#39;s Public API.

## Configuration

| Input | Type | Description | Default Value |
|-------|------|-------------|---------------|
| `region` | `string` | Region. The region for the API, e.g., &#39;api&#39; for US or &#39;eu1&#39; for EU | api |
| `api_token` | `string` | API Token. API token to use. Generate it in Segment&#39;s Workspace settings. |  |
| `start_date` | `string` | Start date.  |  |

## Streams
| Stream Name | Primary Key | Pagination | Supports Full Sync | Supports Incremental |
|-------------|-------------|------------|---------------------|----------------------|
| warehouses | id | DefaultPaginator | ✅ |  ❌  |
| sources | id | DefaultPaginator | ✅ |  ❌  |
| destinations | id | DefaultPaginator | ✅ |  ❌  |
| reverse_etl_models | id | DefaultPaginator | ✅ |  ❌  |
| catalog_destinations | id | DefaultPaginator | ✅ |  ❌  |
| catalog_sources | id | DefaultPaginator | ✅ |  ❌  |
| catalog_warehouses | id | DefaultPaginator | ✅ |  ❌  |
| users | id | DefaultPaginator | ✅ |  ❌  |
| labels | key.value | DefaultPaginator | ✅ |  ❌  |
| audit_events | id | DefaultPaginator | ✅ |  ❌  |
| transformations | id | DefaultPaginator | ✅ |  ❌  |
| spaces | id | DefaultPaginator | ✅ |  ❌  |
| usage_api_calls_daily | timestamp | DefaultPaginator | ✅ |  ✅  |
| usage_mtu_daily | timestamp | DefaultPaginator | ✅ |  ✅  |

## Changelog

<details>
  <summary>Expand to review</summary>

| Version          | Date              | Pull Request | Subject        |
|------------------|-------------------|--------------|----------------|
| 0.0.26 | 2025-07-26 | [64011](https://github.com/airbytehq/airbyte/pull/64011) | Update dependencies |
| 0.0.25 | 2025-07-12 | [63044](https://github.com/airbytehq/airbyte/pull/63044) | Update dependencies |
| 0.0.24 | 2025-06-28 | [60520](https://github.com/airbytehq/airbyte/pull/60520) | Update dependencies |
| 0.0.23 | 2025-05-10 | [60128](https://github.com/airbytehq/airbyte/pull/60128) | Update dependencies |
| 0.0.22 | 2025-05-04 | [59609](https://github.com/airbytehq/airbyte/pull/59609) | Update dependencies |
| 0.0.21 | 2025-04-27 | [59004](https://github.com/airbytehq/airbyte/pull/59004) | Update dependencies |
| 0.0.20 | 2025-04-19 | [58406](https://github.com/airbytehq/airbyte/pull/58406) | Update dependencies |
| 0.0.19 | 2025-04-12 | [57969](https://github.com/airbytehq/airbyte/pull/57969) | Update dependencies |
| 0.0.18 | 2025-04-05 | [57480](https://github.com/airbytehq/airbyte/pull/57480) | Update dependencies |
| 0.0.17 | 2025-03-29 | [56756](https://github.com/airbytehq/airbyte/pull/56756) | Update dependencies |
| 0.0.16 | 2025-03-22 | [56226](https://github.com/airbytehq/airbyte/pull/56226) | Update dependencies |
| 0.0.15 | 2025-03-08 | [55533](https://github.com/airbytehq/airbyte/pull/55533) | Update dependencies |
| 0.0.14 | 2025-03-01 | [54610](https://github.com/airbytehq/airbyte/pull/54610) | Update dependencies |
| 0.0.13 | 2025-02-15 | [54023](https://github.com/airbytehq/airbyte/pull/54023) | Update dependencies |
| 0.0.12 | 2025-02-08 | [53483](https://github.com/airbytehq/airbyte/pull/53483) | Update dependencies |
| 0.0.11 | 2025-02-01 | [53030](https://github.com/airbytehq/airbyte/pull/53030) | Update dependencies |
| 0.0.10 | 2025-01-25 | [52526](https://github.com/airbytehq/airbyte/pull/52526) | Update dependencies |
| 0.0.9 | 2025-01-18 | [51885](https://github.com/airbytehq/airbyte/pull/51885) | Update dependencies |
| 0.0.8 | 2025-01-11 | [51303](https://github.com/airbytehq/airbyte/pull/51303) | Update dependencies |
| 0.0.7 | 2024-12-28 | [50697](https://github.com/airbytehq/airbyte/pull/50697) | Update dependencies |
| 0.0.6 | 2024-12-21 | [50278](https://github.com/airbytehq/airbyte/pull/50278) | Update dependencies |
| 0.0.5 | 2024-12-14 | [49722](https://github.com/airbytehq/airbyte/pull/49722) | Update dependencies |
| 0.0.4 | 2024-12-12 | [49350](https://github.com/airbytehq/airbyte/pull/49350) | Update dependencies |
| 0.0.3 | 2024-12-11 | [49062](https://github.com/airbytehq/airbyte/pull/49062) | Starting with this version, the Docker image is now rootless. Please note that this and future versions will not be compatible with Airbyte versions earlier than 0.64 |
| 0.0.2 | 2024-10-29 | [47546](https://github.com/airbytehq/airbyte/pull/47546) | Update dependencies |
| 0.0.1 | 2024-10-04 | | Initial release by [@zckymc](https://github.com/zckymc) via Connector Builder |

</details>
