import { Button } from "@/components/button";
import { api } from "@/lib/axios";
import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Link {
  id: string,
  title: string,
  url: string,
}

export function ImportantLinks() {
  const { tripId } = useParams()
  const [getImportantLinks, setImportantLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`)
      .then(response => setImportantLinks(response.data.links))
  }, [tripId])

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
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    {link.url}
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            )
          })
        }
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}