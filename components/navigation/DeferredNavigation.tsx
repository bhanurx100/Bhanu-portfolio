'use client';

import dynamic from 'next/dynamic';

const CommandPalette = dynamic(
() =>
import('@/components/navigation/CommandPalette').then((m) => ({
default: m.CommandPalette,
})),
{ ssr: false }
);

const ProgressNav = dynamic(
() =>
import('@/components/navigation/ProgressNav').then((m) => ({
default: m.ProgressNav,
})),
{ ssr: false }
);

const FloatingDock = dynamic(
() => import('@/components/navigation/FloatingDock'),
{ ssr: false }
);

export default function DeferredNavigation() {
return (
<> <CommandPalette /> <ProgressNav /> <FloatingDock />
</>
);
}
