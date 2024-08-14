import { useAppDispatch } from "../app/hooks";
import { Post, ReactionsName, updateReaction } from "../features/posts/postsSlice";

interface ReactionButtonsProps {
  post: Post
}

const reactionEmoji: Record<ReactionsName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useAppDispatch()

  function handleUpdateReaction(reaction: ReactionsName) {
    dispatch(updateReaction({
      id: post.id,
      reaction
    }))
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([reactionName, emoji]) => {
    const reaction = reactionName as ReactionsName

    return (
      <button 
        key={reactionName}
        onClick={() => handleUpdateReaction(reaction)}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })

  return (
    <div>
      {reactionButtons}
    </div>
  )
}