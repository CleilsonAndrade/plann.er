import { Button } from "@/components/button";
import { api } from "@/lib/axios";
import { Link2, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateImportantLinkModal } from "./create-important-link-modal";

interface Link {
  id: string,
  title: string,
  url: string,
}

export function ImportantLinks() {
  const { tripId } = useParams()
  const [getImportantLinks, setImportantLinks] = useState<Link[]>([])
  const [isCreateLinkImportantModalOpen, setIsCreateLinkImportantModalOpen] = useState(false)
  const [titleToLink, setTitleToLink] = useState('')
  const [urlToLink, setURLToLink] = useState('')

  useEffect(() => {
    api.get(`/trips/${tripId}/links`)
      .then(response => setImportantLinks(response.data.links))
  }, [tripId])

  function openImportantLinkModal() {
    setIsCreateLinkImportantModalOpen(true)
  }

  function closeImportantLinkModal() {
    setIsCreateLinkImportantModalOpen(false)
  }

  async function createLinkImportant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.post(`/trips/${tripId}/links`, {
      title: titleToLink,
      url: urlToLink,
    })

    window.document.location.reload()
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {
          getImportantLinks.map(link => {
            return (
              <div key={link.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{link.title}</span>
                  <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    {link.url}
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            )
          })
        }
      </div>

      <Button
        onClick={openImportantLinkModal}
        variant="secondary"
        size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {
        isCreateLinkImportantModalOpen && (
          <CreateImportantLinkModal
            setTitleToLink={setTitleToLink}
            setURLToLink={setURLToLink}
            createLinkImportant={createLinkImportant}
            closeImportantLinkModal={closeImportantLinkModal}
          />
        )
      }
    </div>
  )
}