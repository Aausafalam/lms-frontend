"use client"

import { useState } from "react"

export const useModalHandler = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = (userId) => {
    // Handle delete logic here
    console.log("Deleting user:", userId)

    // Close modal
    setIsDeleteModalOpen(false)
    setSelectedUser(null)

    // You can add success notification here
    // toast.success('User deleted successfully')
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  return {
    isDeleteModalOpen,
    selectedUser,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}
