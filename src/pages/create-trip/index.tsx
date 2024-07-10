import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from "lucide-react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { InviteGuestsModal } from "./invite-guests-modal"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([""])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email,
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
        </div>

        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem!</p>
        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde voce vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {
              isGuestsInputOpen ? (
                <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-4 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                  Alterar local/data
                  <Settings2 className="size-5" />
                </button>
              ) : (
                <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-4 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Continuar
                  <ArrowRight className="size-5" />
                </button>
              )}
          </div>

          {
            isGuestsInputOpen && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
                <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  {
                    emailsToInvite.length > 0 ? (
                      <span className="text-zinc-100">
                        {emailsToInvite.length} pessoa(s) convidada(s)
                      </span>
                    ) : (
                      <span className="text-zinc-400 text-lg flex-1s">Quem estará na viagem?</span>
                    )
                  }
                </button>

                <div className="w-px h-6 bg-zinc-800" />

                <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-4 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirmar viagem
                  <ArrowRight className="size-5" />
                </button>
              </div>
            )
          }
        </div>

        <p className="text-small text-zinc-500">
          Ao planejar sua viagem pela plann.er voce automaticamente concorda<br /> com os nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">politicas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {
        isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
          />
        )
      }
    </div>
  )
}
