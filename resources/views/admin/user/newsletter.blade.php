@extends('admin.app')

@section('content')
<div class="row mb-4">
    <div class="col-sm-12">
        <form method="GET">
            <input type="hidden" name="action" value="{{request()->action}}" />
            <div class="input-group">
                <input type="text" class="input-sm form-control" name="keywords" placeholder="Search" value="{{ request()->keywords }}">
                <span class="input-group-btn">
                    <input class="btn btn btn-primary" type="submit" value="Go!">
                </span>
            </div>
        </form>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($users->isNotEmpty())
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                        <tr>
                            <td>{{ $user->id}}</td>
                            <td>{{ $user->email }}</td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Users</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
					
@endsection