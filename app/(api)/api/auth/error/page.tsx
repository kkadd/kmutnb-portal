import ErrorPage from "@/components/ErrorPage/errorPage";

type Props = {
  searchParams: {
    error?: string;
  };
};
const errorPage = ({ searchParams }: Props) => {
  return <ErrorPage error={searchParams.error ?? null} />;
};

export default errorPage;
