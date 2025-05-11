import { lazy, Suspense } from "react";

function DynamicHeroicon({
  iconName,
  iconStyle = "20/solid",
  fillColor = "currentColor",
  className,
}: {
  iconName: string;
  iconStyle?: string;
  fillColor?: string;
  className?: string;
}) {
  const IconComponent = lazy(async () => {
    try {
      /*  TODO RETHINK this bit overkill for icons + ideally vite + rollup config should be set and not use a path with nodemodules esm*/
      const module = await import(
        /* @vite:ignore */ `../../node_modules/@heroicons/react/${iconStyle}/esm/${iconName}`
      );
      const key = Object.keys(module)[0];
      if (!key) {
        throw new Error(`No export found for ${iconName} in ${iconStyle}`);
      }
      return { default: module[key] };
    } catch (error) {
      console.error(`Error loading icon ${iconName} (${iconStyle}):`, error);
      return { default: () => <></> };
    }
  });

  return (
    <Suspense>
      <div className={className} style={{ color: fillColor }}>
        <IconComponent />
      </div>
    </Suspense>
  );
}

export default DynamicHeroicon;
