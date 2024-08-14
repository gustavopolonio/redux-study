import { useAppSelector } from "../app/hooks"
import { selectUserByID } from "../features/users/usersSlice"

interface PostAuthorProps {
  userId: string
}

export function PostAuthor({ userId }: PostAuthorProps) {
  const user = useAppSelector(state => selectUserByID(state, userId))
  console.log(userId)
  console.log(user)

  return (
    <span>
      {user?.name ?? 'Unknown author'}
    </span>
  )
}