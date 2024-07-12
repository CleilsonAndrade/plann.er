import { Button } from "@/components/button";
import { Link2, Plus, Tag, X } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
  closeImportantLinkModal: () => void,
  setTitleToLink: (title: string) => void,
  setURLToLink: (url: string) => void,
  createLinkImportant: (event: FormEvent<HTMLFormElement>) => void,
}

export function CreateImportantLinkModal({
  closeImportantLinkModal,
  setTitleToLink,
  setURLToLink,
  createLinkImportant,
}: ConfirmTripModalProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeImportantLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLinkImportant} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Titulo do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setTitleToLink(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              name="url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setURLToLink(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Salvar link
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}