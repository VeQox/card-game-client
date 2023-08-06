<script lang="ts">
  import '../theme.postcss';
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton"
</script>

<AppShell>
  <slot/>
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>