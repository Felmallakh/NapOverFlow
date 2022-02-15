const deleteButtons = document.querySelectorAll(".delete-button")
document.addEventListener("DOMContentLoaded", e => {
      deleteButtons.forEach(button => {
            button.addEventListener('click', async e => {
                  e.preventDefault();
                  const answerIdToDelete = e.target.id

                  const res = await fetch(`/answers/${answerIdToDelete}`,
                   { method: "DELETE" })

                  const data = await res.json()

                  if (data.message === "Success") {
                        const container = document.querySelector(`#answer-${answerIdToDelete}`)
                        container.remove();
                  }
            })
      })

})
