console.log("linked to public/javascripts/question.js")

const deleteButtons = document.querySelectorAll(".delete-button")
document.addEventListener("DOMContentLoaded", e => {
      deleteButtons.forEach(button => {
            button.addEventListener('click', async e => {
                  e.preventDefault();
                  const answerIdToDelete = e.target.id
                  console.log(answerIdToDelete, '<-- answer id to delete')

                  const res = await fetch(`/answers/${answerIdToDelete}`, { method: "DELETE" })

                  const data = await res.json()
                  console.log(data, '<-- fetched object')

                  if (data.message === "Success") {
                        const container = document.querySelector(`#answer-${answerIdToDelete}`)
                        container.remove();
                  }
            })
      })

})
