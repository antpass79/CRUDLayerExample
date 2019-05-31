using System.Collections.Generic;

namespace CRUD.Helpers
{
    public class RunTimeCacheSession
    {
        Dictionary<string, object> _cache = new Dictionary<string, object>();

        public RunTimeCacheSession(string name)
        {
            this.Name = name;
        }

        public string Name { get; private set; }

        public void Add(string key, object value)
        {
            _cache.Add(key, value);
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
        }

        public bool ContainsKey(string key)
        {
            return _cache.ContainsKey(key);
        }

        public T GetItem<T>(string key)
        {
            if (!_cache.ContainsKey(key))
                return default(T);

            return (T)_cache[key];
        }

        public object this[string key]
        {
            get { return _cache[key]; }
            set { _cache[key] = value; }
        }

        public void Clear()
        {
            _cache.Clear();
        }
    }

    public static class RunTimeCache
    {
        static object _object = new object();

        static RunTimeCacheSession _cacheSession;
        public static RunTimeCacheSession Default
        {
            get
            {
                lock (_object)
                {
                    if (_cacheSession == null)
                        _cacheSession = new RunTimeCacheSession("Default");

                    return _cacheSession;
                }
            }
        }
    }
}
