import React from 'react'

export default function ErrorComponent({errorMessage}) {
  return (
    <div className="text-danger">{errorMessage}</div>
  )
}
