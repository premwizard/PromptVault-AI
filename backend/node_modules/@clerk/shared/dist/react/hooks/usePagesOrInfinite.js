const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useInfiniteQuery = require('../query/useInfiniteQuery.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_usePagesOrInfinite_shared = require('./usePagesOrInfinite.shared.js');
let react = require("react");

//#region src/react/hooks/usePagesOrInfinite.tsx
const usePagesOrInfinite = (params) => {
	const { fetcher, config, keys } = params;
	const [paginatedPage, setPaginatedPage] = (0, react.useState)(config.initialPage ?? 1);
	const initialPageRef = (0, react.useRef)(config.initialPage ?? 1);
	const pageSizeRef = (0, react.useRef)(config.pageSize ?? 10);
	const enabled = config.enabled ?? true;
	const isSignedIn = config.isSignedIn;
	const triggerInfinite = config.infinite ?? false;
	const cacheMode = config.__experimental_mode === "cache";
	const keepPreviousData = config.keepPreviousData ?? false;
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const queriesEnabled = enabled && Boolean(fetcher) && !cacheMode && isSignedIn !== false;
	const [forceUpdateCounter, setForceUpdateCounter] = (0, react.useState)(0);
	const forceUpdate = (0, react.useCallback)((updater) => {
		setForceUpdateCounter(updater);
	}, []);
	const pagesQueryKey = (0, react.useMemo)(() => {
		const [stablePrefix, authenticated, tracked, untracked] = keys.queryKey;
		return [
			stablePrefix,
			authenticated,
			tracked,
			{
				...untracked,
				args: {
					...untracked.args,
					initialPage: paginatedPage,
					pageSize: pageSizeRef.current
				}
			}
		];
	}, [keys.queryKey, paginatedPage]);
	const singlePageQuery = require_useQuery.useClerkQuery({
		queryKey: pagesQueryKey,
		queryFn: ({ queryKey }) => {
			const { args } = queryKey[3];
			if (!fetcher) return;
			return fetcher(args);
		},
		staleTime: 6e4,
		enabled: queriesEnabled && !triggerInfinite,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	const infiniteQueryKey = (0, react.useMemo)(() => {
		const [stablePrefix, authenticated, tracked, untracked] = keys.queryKey;
		return [
			stablePrefix + "-inf",
			authenticated,
			tracked,
			untracked
		];
	}, [keys.queryKey]);
	const infiniteQuery = require_useInfiniteQuery.useClerkInfiniteQuery({
		queryKey: infiniteQueryKey,
		initialPageParam: config.initialPage ?? 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			const total = lastPage?.total_count ?? 0;
			return (allPages.length + (config.initialPage ? config.initialPage - 1 : 0)) * (config.pageSize ?? 10) < total ? lastPageParam + 1 : void 0;
		},
		queryFn: ({ pageParam, queryKey }) => {
			const { args } = queryKey[3];
			if (!fetcher) return;
			return fetcher({
				...args,
				initialPage: pageParam,
				pageSize: pageSizeRef.current
			});
		},
		staleTime: 6e4,
		enabled: queriesEnabled && triggerInfinite
	});
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: isSignedIn === false,
		authenticated: keys.authenticated,
		stableKeys: require_useClearQueriesOnSignOut.withInfiniteKey(keys.stableKey),
		onCleanup: () => {
			setPaginatedPage(initialPageRef.current);
			Promise.resolve().then(() => forceUpdate((n) => n + 1));
		}
	});
	const { data, count, page } = (0, react.useMemo)(() => {
		if (triggerInfinite) {
			const cachedData = queryClient.getQueryData(infiniteQueryKey);
			const pages = queriesEnabled ? infiniteQuery.data?.pages ?? cachedData?.pages ?? [] : cachedData?.pages ?? [];
			const validPages = Array.isArray(pages) ? pages.filter(Boolean) : [];
			return {
				data: validPages.map((a) => a?.data).flat().filter(Boolean) ?? [],
				count: validPages[validPages.length - 1]?.total_count ?? 0,
				page: validPages.length > 0 ? validPages.length : initialPageRef.current
			};
		}
		const pageData = queriesEnabled ? singlePageQuery.data ?? queryClient.getQueryData(pagesQueryKey) : queryClient.getQueryData(pagesQueryKey);
		return {
			data: Array.isArray(pageData?.data) ? pageData.data : [],
			count: typeof pageData?.total_count === "number" ? pageData.total_count : 0,
			page: paginatedPage
		};
	}, [
		queriesEnabled,
		forceUpdateCounter,
		triggerInfinite,
		infiniteQuery.data?.pages,
		singlePageQuery.data,
		queryClient,
		infiniteQueryKey,
		pagesQueryKey,
		paginatedPage
	]);
	const fetchPage = (0, react.useCallback)((numberOrgFn) => {
		if (triggerInfinite) {
			const next = typeof numberOrgFn === "function" ? numberOrgFn(page) : numberOrgFn;
			const targetCount = Math.max(0, next);
			const cachedData = queryClient.getQueryData(infiniteQueryKey);
			if (targetCount - (infiniteQuery.data?.pages ?? cachedData?.pages ?? []).length > 0) infiniteQuery.fetchNextPage({ cancelRefetch: false });
			return;
		}
		return setPaginatedPage(numberOrgFn);
	}, [
		infiniteQuery,
		page,
		triggerInfinite,
		queryClient,
		infiniteQueryKey
	]);
	const isLoading = triggerInfinite ? infiniteQuery.isLoading : singlePageQuery.isLoading;
	const isFetching = triggerInfinite ? infiniteQuery.isFetching : singlePageQuery.isFetching;
	const error = (triggerInfinite ? infiniteQuery.error : singlePageQuery.error) ?? null;
	const isError = !!error;
	const fetchNext = (0, react.useCallback)(() => {
		if (triggerInfinite) {
			infiniteQuery.fetchNextPage({ cancelRefetch: false });
			return;
		}
		setPaginatedPage((n) => Math.max(0, n + 1));
	}, [infiniteQuery, triggerInfinite]);
	const fetchPrevious = (0, react.useCallback)(() => {
		if (triggerInfinite) return;
		setPaginatedPage((n) => Math.max(0, n - 1));
	}, [triggerInfinite]);
	const offsetCount = require_usePagesOrInfinite_shared.calculateOffsetCount(initialPageRef.current, pageSizeRef.current);
	const pageCount = require_usePagesOrInfinite_shared.calculatePageCount(count, offsetCount, pageSizeRef.current);
	const hasNextPage = triggerInfinite ? Boolean(infiniteQuery.hasNextPage) : require_usePagesOrInfinite_shared.calculateHasNextPage(count, offsetCount, page, pageSizeRef.current);
	const hasPreviousPage = triggerInfinite ? Boolean(infiniteQuery.hasPreviousPage) : require_usePagesOrInfinite_shared.calculateHasPreviousPage(page, pageSizeRef.current, offsetCount);
	const setData = (value) => {
		if (triggerInfinite) {
			queryClient.setQueryData(infiniteQueryKey, (prevValue = {}) => {
				const prevPages = Array.isArray(prevValue?.pages) ? prevValue.pages : [];
				const nextPages = typeof value === "function" ? value(prevPages) : value;
				return {
					...prevValue,
					pages: nextPages
				};
			});
			forceUpdate((n) => n + 1);
			return Promise.resolve();
		}
		queryClient.setQueryData(pagesQueryKey, (prevValue = {
			data: [],
			total_count: 0
		}) => {
			return typeof value === "function" ? value(prevValue) : value;
		});
		forceUpdate((n) => n + 1);
		return Promise.resolve();
	};
	const revalidate = async () => {
		await queryClient.invalidateQueries({ queryKey: keys.invalidationKey });
		const [stablePrefix, ...rest] = keys.invalidationKey;
		return queryClient.invalidateQueries({ queryKey: [stablePrefix + "-inf", ...rest] });
	};
	return {
		data,
		count,
		error,
		isLoading,
		isFetching,
		isError,
		page,
		pageCount,
		fetchPage,
		fetchNext,
		fetchPrevious,
		hasNextPage,
		hasPreviousPage,
		revalidate,
		setData
	};
};

//#endregion
exports.usePagesOrInfinite = usePagesOrInfinite;