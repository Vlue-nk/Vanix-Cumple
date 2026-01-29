import clsx from 'classnames';

/**
 * MediaCard
 * - Keeps aspect ratio (default 9:16)
 * - Never stretches media; uses cover by default, contain for horizontal media
 */
const MediaCard = ({
  as = 'div',
  className,
  aspect = '9 / 16',
  mediaClassName,
  children,
}) => {
  const Comp = as;
  return (
    <Comp
      className={clsx('card-vert card-frame relative', className)}
      style={{ aspectRatio: aspect }}
    >
      <div className={clsx('absolute inset-0', mediaClassName)}>{children}</div>
    </Comp>
  );
};

export default MediaCard;

