import { formatDistanceToNow, parseISO } from "date-fns"

interface PostTimeAgoProps {
  createdAt: string
}

export function PostTimeAgo({ createdAt }: PostTimeAgoProps) {
  const formattedDate = parseISO(createdAt)
  const distanceToNow = formatDistanceToNow(formattedDate)

  return (
    <time dateTime={createdAt} title={createdAt}>
      {distanceToNow} ago
    </time>
  )
}