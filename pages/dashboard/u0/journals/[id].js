import { useRouter } from 'next/router'

const JournalItem = () => {
  const router = useRouter()
  console.log(router)
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default JournalItem