import { api } from "@/lib/axios"
import { FormEvent, useState } from "react"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { InviteGuestsModal } from "./invite-guests-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDate] = useState<DateRange | undefined>()

  function openGuestsInput() {
    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
      return
    }

    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
      return
    }


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

  function removeOwnerEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerEmail || !ownerName) {
      return
    }

    const response = await api.post('/trips', {
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
        </div>

        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem!</p>
        <div className="space-y-4">

          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDate={setEventStartAndEndDate}
          />
          {
            isGuestsInputOpen && (
              <InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestsModal={openGuestsModal}
              />
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
          removeOwnerEmailFromInvite={removeOwnerEmailFromInvite}
        />
      )}

      {
        isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            destination={destination}
            eventStartAndEndDates={eventStartAndEndDates}
          />
        )
      }
    </div>
  )
}
