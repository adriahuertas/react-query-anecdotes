import { QueryClient, useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  let timeoutId

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    console.log("new anecdote")
    if (content.length < 5) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        data: "too short anecdote, must have length 5 or more",
      })
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      notificationDispatch({
        type: "SET_NOTIFICATION",
        data: `you created '${content}'`,
      })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
