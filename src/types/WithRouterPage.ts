import { RouteComponentProps } from "react-router";

/**
 * @param P props.match.params
 * @param T component props
 */

export type WithRouterPage<P, T> = RouteComponentProps<P> & T;
