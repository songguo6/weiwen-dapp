import get from 'lodash/get'
import last from 'lodash/last'
import { rpc, contract } from './config'

const page_count = 10;

export const fetchAll = async (table, options) => {
  const mergedOptions = {
    json: true,
    code: contract,
    scope: contract,
    table: table,
    lower_bound: 0,
    upper_bound: -1,
    limit: 9999,
    key: 'id',
    key_type: 'i64',
    index_position: '1',
    ...options,
  }

  let rows = [];
  let lowerBound = mergedOptions.lower_bound;

  for (let i = 0; i < page_count; i++) {
    const result = await rpc.get_table_rows({
      ...mergedOptions,
      lower_bound: lowerBound,
    });
    rows = rows.concat(result.rows);

    if (!result.more || result.rows.length === 0){
      break;
    }

    lowerBound = get(last(result.rows), mergedOptions.key) + 1;
  }
  return rows;
}

