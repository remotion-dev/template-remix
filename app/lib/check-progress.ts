export const checkProgress = async (
  fetcher: any,
  renderIds: string[]
): Promise<
  {
    renderId: string;
    done: boolean;
    overallProgress: number;
    errors: { (key: string): string }[] | undefined;
  }[]
> => {
  await fetcher.submit(
    { renderIds: JSON.stringify(renderIds) },
    {
      method: "post",
      action: "render-status",
    }
  );
  return fetcher.data;
};
