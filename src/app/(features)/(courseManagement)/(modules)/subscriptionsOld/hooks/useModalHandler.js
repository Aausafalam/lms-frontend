"use client"

import { useRouter, useSearchParams } from "next/navigation"

const useModalHandler = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const modalType = searchParams.get("modal")
  const subscriptionId = searchParams.get("id")
  const courseId = searchParams.get("courseId")

  const closeModal = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete("modal")
    params.delete("id")
    params.delete("courseId")
    router.push(`/subscriptions?${params.toString()}`, undefined, { shallow: true })
  }

  const setModalState = (modal, id) => {
    const params = new URLSearchParams(window.location.search)
    if (id) params.set("id", id)
    if (modal) params.set("modal", modal)
    if (courseId) params.set("courseId", courseId)
    router.push(`/subscriptions?${params.toString()}`, undefined, { shallow: true })
  }

  return { modalType, subscriptionId, closeModal, setModalState }
}

export default useModalHandler
