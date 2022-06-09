import { PropsWithChildren, useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { isMobile } from 'lib/utils/mobile';
import { getCurrentTerm } from 'lib/utils/terms';

import { Header } from 'common/header';
import { Sidebar } from 'common/layouts/sidebar/containers/Sidebar';
import { SearchResults } from 'common/layouts/sidebar/variants/SearchResults';
import { Mobile } from 'common/mobile';

type Props = {
  title?: string;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  mobileSupport?: boolean;
};

export function Page({ title, leftSidebar, rightSidebar, mobileSupport, children }: PropsWithChildren<Props>) {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();
  const { term, slug } = useParams();
  const smallScreen = useSmallScreen();

  const route = location.pathname.split('/')[1];

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  const contest = useMatch('/contest');
  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else if (route && !slug && !contest) {
      navigate(`/${route}/${savedTerm}`, { replace: true });
    }
  }, [navigate, route, savedTerm, setSavedTerm, term, slug, contest]);

  return (
    <>
      {!mobileSupport && <Mobile />}
      <Flex h={isMobile ? window.innerHeight : '100vh'} direction="column" overflowX="hidden" overflowY="hidden">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header onSearchChange={handleSearchChange} />
        <Flex overflowY="auto" h="100%">
          {!smallScreen && query.length > 0 ? (
            <Sidebar>
              <SearchResults />
            </Sidebar>
          ) : (
            leftSidebar && !smallScreen && <Sidebar>{leftSidebar}</Sidebar>
          )}
          <Flex overflowY="auto" zIndex={56} w="100%" justifyContent="center" overflowX="hidden" boxShadow="md">
            {smallScreen && query.length > 0 ? (
              <Sidebar>
                <SearchResults />
              </Sidebar>
            ) : (
              children
            )}
          </Flex>
          {rightSidebar && !smallScreen && <Sidebar>{rightSidebar}</Sidebar>}
        </Flex>
      </Flex>
    </>
  );
}
