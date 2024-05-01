import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'
import {setQueryDataForBook} from './books'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
  onError: (err, updates, recover) => {
    if (typeof recover === 'function') {
      recover()
    }
  },
}

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {
      onMutate: updates => {
        const previousListItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData(
          'list-items',
          previousListItems.map(item => {
            return item.id === updates.id ? {...item, ...updates} : item
          }),
        )
        return () => queryCache.setQueryData('list-items', previousListItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    {
      onMutate: updates => {
        const previousListItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData(
          'list-items',
          previousListItems.filter(item => {
            return item.id !== updates.id ? {...item, ...updates} : item
          }),
        )
        return () => queryCache.setQueryData('list-items', previousListItems)
      },
      ...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
