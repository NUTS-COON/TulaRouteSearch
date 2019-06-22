using System;

namespace TulaRouteSearcherAPI.Stores
{
    public abstract class BaseStore : IDisposable
    {
        protected bool _disposed;

        public BaseStore() { }

        protected virtual void ThrowIfDisposed()
        {
            if (_disposed)
                throw new ObjectDisposedException(GetType().Name);
        }

        public virtual void Dispose()
        {
            _disposed = true;
        }
    }
}
