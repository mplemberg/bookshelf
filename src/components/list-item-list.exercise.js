/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useQuery} from 'react-query'
import {client} from 'utils/api-client'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  // 🐨 call useQuery to get the list-items from the 'list-items' endpoint
  // queryKey should be 'list-items'
  // queryFn should call the 'list-items' endpoint
  const {data: listItems, isLoading} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
  })

  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noListItems} {isLoading ? <div>Loading...</div> : null}
      </div>
    )
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
        {isLoading ? <div>Loading...</div> : null}
      </div>
    )
  }

  return (
    <BookListUL>
      {isLoading ? <div>Loading...</div> : null}

      {filteredListItems.map(listItem => (
        <li key={listItem.id}>
          <BookRow user={user} book={listItem.book} />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}
