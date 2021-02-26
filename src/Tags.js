import React from "react"

export default function Tags({ tags }) {
  return (
    <div>
      {tags.map(tag => (
        <p class="tags">
          <span>{tag}</span>
        </p>
      ))}
    </div>
  )
}
