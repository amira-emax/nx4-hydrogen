import {Button} from '~/components/ui/button';

export function ButtonsPreview() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Light Theme Variants</h3>
        <div className="p-6 border rounded-lg space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Primary</Button>
            <Button variant="filled">Filled (Accent)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="box">Box</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
            <span className="text-sm text-muted-foreground mr-2 font-medium">
              Small Size:
            </span>
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="filled">
              Filled
            </Button>
            <Button size="sm" variant="box">
              Box
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Dark Theme / Inverse Variants</h3>
        <div className="p-6 border rounded-lg bg-black text-white space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="inverse">Inverse</Button>
            <Button variant="box-inverse">Box Inverse</Button>
            <Button variant="ghost-inverse">Ghost Inverse</Button>
            <Button variant="link-inverse">Link Inverse</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Interaction & Icons</h3>
        <div className="p-6 border rounded-lg flex flex-wrap gap-4 items-center">
          <Button leftIcon>Left Icon</Button>
          <Button rightIcon>Right Icon</Button>
          <Button leftIcon rightIcon>
            Both Icons
          </Button>
          <Button size="sm" rightIcon>
            Small w/ Icon
          </Button>
        </div>
      </section>
    </div>
  );
}
